import React, { useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie';
import {
  Box, Flex, Text, IconButton, VStack, HStack, Input, Button, Avatar,
  useColorModeValue, useToast, AlertDialog, AlertDialogBody, AlertDialogFooter,
  AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useDisclosure,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton,
} from '@chakra-ui/react';
import { FiMenu, FiSearch, FiFile, FiSettings, FiTrash2, FiLogOut, FiX, FiUpload } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUserData } from '../services/api';



const Home = () => {
  const [user, setUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const cancelRef = React.useRef();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen: isLogoutDialogOpen, onOpen: onLogoutOpen, onClose: onLogoutClose } = useDisclosure();
  const { isOpen: isModalOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();
  const [peerConnection, setPeerConnection] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();
  const signalingServer = useRef(null);
  const peerConnectionRef = useRef(null);

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      fetchData(token);
    } else {
      navigate('/login');
    }

    // Initialize RTCPeerConnection
    if (!peerConnectionRef.current) {
      peerConnectionRef.current = new RTCPeerConnection();
      peerConnectionRef.current.onicecandidate = (event) => {
        console.log('ICE Candidate:', event.candidate);
      };
      peerConnectionRef.current.onconnectionstatechange = () => {
        console.log('Connection state:', peerConnectionRef.current.connectionState);
      };
    }

    // Cleanup on unmount
    return () => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
      }
    };
  }, [navigate]);

  useEffect(() => {
    // Initialize WebSocket connection
    if (user?.email && !signalingServer.current) {
      signalingServer.current = new WebSocket(`ws://127.0.0.1:8000/ws/${user.email}`);
      signalingServer.current.onopen = () => console.log('WebSocket connection established');
      signalingServer.current.onclose = () => signalingServer.current = null;
      signalingServer.current.onerror = (error) => console.error('WebSocket error:', error);
      signalingServer.current.onmessage = handleMessage;
    }

    // Cleanup WebSocket on unmount
    return () => {
      if (signalingServer.current) {
        signalingServer.current.close();
        signalingServer.current = null;
      }
    };
  }, [user]);

  
  const fetchData = async (token) => {
    try {
      const data = await fetchUserData(token);
      setUser(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
      console.error('Fetching user data failed:', errorMessage);
    }
  };

  const handleLogout = () => {
    onLogoutOpen();
  };

  const confirmLogout = () => {
    setIsLoading(true);
    Cookies.remove('accessToken');

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Logout successful.',
        description: 'You have been logged out.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
    }, 1000);
  };
  const handleFileChange = (event) => setFile(event.target.files[0]);

  const handleUpload = () => {
    if (!recipient || !file) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields and select a file.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const dataChannel = peerConnectionRef.current.createDataChannel('fileTransfer');
    dataChannel.onopen = () => {
      const reader = new FileReader();
      reader.onload = (e) => {
        dataChannel.send(e.target.result);
        toast({
          title: 'File Sent',
          description: `File successfully sent to ${recipient}.`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      };
      reader.readAsArrayBuffer(file);
    };

    peerConnectionRef.current.createOffer().then((offer) => {
      peerConnectionRef.current.setLocalDescription(offer);
      signalingServer.current.send(JSON.stringify({ type: 'offer', email: recipient, offer }));
    });
  };

  const handleMessage = (event) => {
    const { type, offer, sender, answer } = JSON.parse(event.data);

    if (type === 'offer') {
      peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
      peerConnectionRef.current.createAnswer().then((answer) => {
        peerConnectionRef.current.setLocalDescription(answer);
        signalingServer.current.send(JSON.stringify({ type: 'answer', email: sender, answer }));
      });
    }

    if (type === 'answer') {
      peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
    }
  };


  return (
    <Flex h="100vh" bg={useColorModeValue('gray.100', 'gray.900')} flexDirection={{ base: 'column', md: 'row' }}>
      {/* Sidebar Toggle Button */}
      <IconButton
        aria-label="Open sidebar"
        icon={<FiMenu />}
        onClick={onOpen}
        display={{ base: 'flex', md: 'none' }}
        position="absolute"
        zIndex="1"
        m={4}
      />

      {/* Sidebar */}
      <Box
        w={{ base: 'full', md: '250px' }}
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        shadow="md"
        display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
        position={{ base: 'absolute', md: 'relative' }}
        top={0}
        left={0}
        zIndex={1}
      >
        {/* Close Button */}
        <IconButton
          aria-label="Close sidebar"
          icon={<FiX />}
          onClick={onClose}
          display={{ base: 'block', md: 'none' }}
          mb={4}
          variant="ghost"
          float="right"
        />

        {/* User Profile */}
        <Link to="/userprofile">
          <VStack spacing={3} align="start" mb={6}>
            <Avatar size="md" name={user ? `${user.first_name} ${user.last_name}` : 'User Avatar'} src="https://bit.ly/dan-abramov" />
            {user ? (
              <>
                <Text fontSize="md" fontWeight="bold">{user.first_name} {user.last_name}</Text>
                <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>{user.email}</Text>
              </>
            ) : (
              <Text fontSize="md">Loading user data...</Text>
            )}
          </VStack>
        </Link>

        <VStack align="start" spacing={4}>
          <Text fontSize="xl" fontWeight="bold">Project files</Text>
          <Button variant="ghost" w="full" justifyContent="start" leftIcon={<FiFile />}>New document</Button>
          <Button variant="ghost" w="full" justifyContent="start" leftIcon={<FiUpload />} onClick={openModal}>
            Upload File
          </Button>
          <Button variant="ghost" w="full" justifyContent="start" leftIcon={<FiSettings />}>Settings</Button>
          <Button variant="ghost" w="full" justifyContent="start" leftIcon={<FiLogOut />} onClick={handleLogout}>Logout</Button>
        </VStack>
      </Box>

       {/* Main Content */}
       <Flex flex="1" direction="column" p={{ base: '4', md: '6' }} overflowY="auto" mt={{ base: '60px', md: '0' }}>
        <HStack justify="space-between" mb={6}>
          <HStack spacing={4}>
            <Input placeholder="Search..." size="md" width={{ base: 'auto', md: '200px' }} />
            <IconButton icon={<FiSearch />} aria-label="Search" />
          </HStack>
        </HStack>

        <Box bg={useColorModeValue('white', 'gray.800')} p={4} shadow="md" borderRadius="md">
          <Text fontSize="lg" mb={4}>Recently modified</Text>
          <VStack align="start" spacing={4}>
            <HStack justify="space-between" w="full">
              <Text>Dashboard tech requirements</Text>
              <HStack spacing={2}>
                <IconButton icon={<FiFile />} aria-label="Open file" size="sm" />
                <IconButton icon={<FiTrash2 />} aria-label="Delete file" size="sm" />
              </HStack>
            </HStack>
          </VStack>
        </Box>
      </Flex>


      {/* File Upload Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload File</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Recipient Email"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
              <Input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpload}>
              Send File
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Logout Confirmation Dialog */}
      <AlertDialog isOpen={isLogoutDialogOpen} leastDestructiveRef={cancelRef} onClose={onLogoutClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">Confirm Logout</AlertDialogHeader>
            <AlertDialogBody>Are you sure you want to log out? You will be redirected to the login page.</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onLogoutClose}>Cancel</Button>
              <Button colorScheme="blue" onClick={confirmLogout} ml={3} isLoading={isLoading}>Logout</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

export default Home;

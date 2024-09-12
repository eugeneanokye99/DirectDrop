# Databse Models

### **Imports**

```

from app.database.db import Base
from sqlalchemy.sql.expression import text
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql.sqltypes import TIMESTAMP
from datetime import datetime

```

1.**`from app.database.db import Base`**

- **`Base`** is the declarative base class imported from the database setup (usually defined in your `db.py`). It serves as the foundation for all ORM models.
- Every model you define will inherit from this `Base` class. This allows SQLAlchemy to know that this class should be treated as a database table.

2.**`from sqlalchemy.sql.expression import text`**

- **`text`** is a SQL expression constructor from SQLAlchemy that allows you to write raw SQL. In the case of the `User` model, it is used to set a default value (e.g., `CURRENT_TIMESTAMP`) for the `created_at` column.

3.**`from sqlalchemy import Column, Integer, String, Boolean, DateTime`**

- These are basic data types and column definitions that help SQLAlchemy define the schema of your database tables:
    - **`Column`**: Defines a column in the database.
    - **`Integer`**: Defines an integer column (e.g., for primary keys or IDs).
    - **`String`**: Defines a string column, typically used for text fields like names and emails.
    - **`Boolean`**: Defines a boolean column for storing `True`/`False` values, such as flags like `is_verified` and `is_admin`.
    - **`DateTime`**: Defines a column that stores date and time values.

4.**`from sqlalchemy.sql.sqltypes import TIMESTAMP`**

- **`TIMESTAMP`** is used to store time-based information in the database, often used for columns like `created_at` that track when a row is created.

#5.**`from datetime import datetime`**

- **`datetime`** is a built-in Python library used to manipulate date and time objects. Although not directly used in the model shown, it's typically used for setting or manipulating date values.

---

2.**Explanation of the `User` Model**

```

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, nullable=False)
    first_name = Column(String, unique=True, nullable=False)
    last_name = Column(String, unique=True, nullable=False)
    password = Column(Integer, nullable=False)
    email = Column(String, unique=True, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('CURRENT_TIMESTAMP'))
    is_verified = Column(Boolean, server_default='FALSE', nullable=False)
    is_admin = Column(Boolean, server_default='FALSE', nullable=False)

```

**Model Explanation:**

1. **`__tablename__ = "users"`**:
    - Defines the name of the table as `"users"` in the database.
2. **`id = Column(Integer, primary_key=True, nullable=False)`**:
    - **`id`** is the primary key of the table, and it cannot be `NULL`. It uniquely identifies each row in the table.
3. **`first_name = Column(String, unique=True, nullable=False)`**:
    - Stores the first name of the user as a string. It is unique (no two users can have the same first name) and cannot be `NULL`.
4. **`last_name = Column(String, unique=True, nullable=False)`**:
    - Stores the last name of the user, similar to `first_name`, with the same constraints.
5. **`password = Column(Integer, nullable=False)`**:
    - Stores the user's password as an integer. While this is defined as an integer, it's not ideal for storing passwords (normally hashed strings are recommended).
6. **`email = Column(String, unique=True, nullable=False)`**:
    - Stores the user’s email address. It is unique and must not be `NULL`. Email addresses should always be unique for users to ensure proper authentication.
7. **`created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('CURRENT_TIMESTAMP'))`**:
    - This column stores the timestamp of when the user was created. The `server_default=text('CURRENT_TIMESTAMP')` ensures that the database automatically sets the value to the current time when the user is created.
8. **`is_verified = Column(Boolean, server_default='FALSE', nullable=False)`**:
    - Stores whether the user is verified. By default, it is set to `FALSE`, meaning that when a user is created, they are not verified.
9. **`is_admin = Column(Boolean, server_default='FALSE', nullable=False)`**:
    - Stores whether the user has admin privileges. By default, it is also set to `FALSE`.
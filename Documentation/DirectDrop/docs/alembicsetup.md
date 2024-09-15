### Using Alembic for Database Migrations

Alembic is a lightweight database migration tool used with SQLAlchemy to track changes in your database schema. It allows you to **create migrations** to reflect changes in your Python models and **apply those migrations** to your database.


### Set up for Alembic to keep track on your changes

1.If you do not have Alembic installed or skipped the requirements.txt by some chance, Run this :

```python

pip install alembic

```

2.Run `alembic upgrade head` to upgrade the migration to the latest changes

 




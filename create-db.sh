createdb ideadb
psql -f schema.sql ideadb
psql -f seed.sql ideadb
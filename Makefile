include .env

start:
	docker-compose up -d --build

load-dump:
	docker-compose exec myfiche-mongodb mongorestore --username $(MONGO_USER) --password $(MONGO_PASSWORD) --authenticationDatabase admin myfiche-dump

stop:
	docker-compose down

purge:
	docker-compose down -v

re: purge start

.PHONY: start load-dump stop purge re

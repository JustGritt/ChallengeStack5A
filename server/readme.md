# Install project : 

```shell
make install
```

### Show all commands

```shell
make # or
make help
```

### Useful commands : 

```shell
> make stop # Stop all docker images
> make start # Start all docker images
> make restart # Restart all docker images
> make migration # Create migration with changes
> make migrate # Apply new migration 
> make composer # Composer install in docker container

> make docker-disable # Disable docker for php container 
> make docker-enable # Enable docker for php container
...
```

If you disable docker for php container, you should create a .env.local file with 

```dotenv
MAILER_DSN=smtp://localhost:1025
DATABASE_URL="postgresql://symfony:password@localhost:5432/postgres?serverVersion=15&charset=utf8"
```


If make is not enabled : 

```shell
# Si make n'est pas installé 
> docker compose build
> docker compose up -d
> docker compose exec -it php sh

# Le terminal du container s'ouvre :
> composer install
> bin/console lexik:jwt:generate-keypair -n --overwrite
> bin/console doctrine:database:create --if-not-exists
> bin/console doctrine:migrations:migrate -n
> bin/console hautelook:fixture:load -n
```

# Doc Swagger
```
http://localhost:8888/api
```
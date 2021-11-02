# myfiche.fr

Some old web project that aimed to summarize high school level courses in a concise and illustrated format.

## IMPORTANT NOTE

This is my first real web project which I did almost 2 years ago. It's dirty, flawed, and almost unusable in practice. However, for posterity sake,
it's there.

## Run

I've recently setup deployment through the use of a `docker-compose` file. Make sure you have `docker` and `docker-compose` installed on your machine.

Then, you simply need to:

```sh
make
```
This should setup two containers: the actual NodeJS application as well as the mongodb database.

### Populate database

By default, the mongo database will be empty.

However, once the application and the database are properly started, one can run the `make load-dump` command to restore the database data from the last backup, made available under the `./dump` directory.

Note: `make load-dump` will most likely cause an error: feel free to ignore that.

The backup that will be loaded contains only one user which has root permissions on the website, it's credentials are `myfiche-root:rootAd0118/`.

### Other commands

`make stop` will stop the application and the database. Database's data persists inside its docker volume.

`make purge` will do the same as `make stop` but will also destroy the docker volume that holds database's data.

`make re` does `make purge` then `make`.
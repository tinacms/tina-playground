```
cp .env.local.sample .env.local
```

This project relies on endpoints that live within tinacms.org (we'll run tinacms.org on port 4005)

```
git clone git@github.com:tinacms/tinacms.org.git tinacms-site
cd tinacms-site
yarn install
yarn dev -p 4005
```

From this repo:

```
yarn install
```

```
yarn dev
```

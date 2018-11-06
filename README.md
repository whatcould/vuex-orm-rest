<p align="center">
  <img width="192" src="https://github.com/vuex-orm/vuex-orm/raw/master/logo-vuex-orm.png" alt="Vuex ORM">
</p>

<h1 align="center">Vuex ORM Plugin: vuex-orm-rest</h1>

[Vuex-ORM](https://github.com/vuex-orm/vuex-orm) brings Object-Relational Mapping to the Vuex Store. vuex-orm-rest lets you communicate with RESTful backends.

The plugin extends the basic model of Vuex-ORM with some helful functions to make CRUD operations such as (save, fetch, fetchAll, update and delete).

You no longer need to access your http client manually. All the comunication happens thru the enhanced Vuex-ORM models.

# Installation

``` bash
yarn add vuex-orm-rest
```

or

``` bash
npm install vuex-orm-rest
```

The plugin requires a HTTP-Client to make requests to the backend. The client is passed as an option to the plugin. The following tables shows the association between the client- and CRUD method.

| Plugin   | Client |
|----------|--------|
| fetch    | get    |
| fetchAll | get    |
| save     | post   |
| update   | patch  |
| replace  | put    |
| destroy  | delete |

Also the a vue-router instance is needed to generate routes from the model instances.

The following exmaple installs the plugin using [axios](https://github.com/axios/axios) as the HTTP-Client and a vue-router instance.

``` javascript
import VuexORM from '@vuex-orm/core';
import VuexORMRest from 'vuex-orm-rest';
import axios from 'axios';
import VueRouter from 'vue-router';

const client = axios.create({ baseURL: '/api' });
const router = new VueRouter();

VuexORM.use(VuexORMRest, { client, router });
```

# Defining models

Go to https://vuex-orm.github.io/vuex-orm/guide/components/models.html to see how to define models using Vuex-ORM.

# Interacting with the backend

Assume we have a `user` model. Additionally to the `entity` an `apiPath` variable has to be defined.
The `apiPath` represents the URL under which the entity is reachable on the REST API.

``` javascript
import { Model } from '@vuex-orm/core';

class User extends Model {
  static entity = 'users';
  static apiPath = 'users';

  static fields () {
    return {
      id: this.attr(null),
      name: this.attr('')
    }
  }
}
```

## fetch

Fills the store with a single item by id.
Returns a promise with the fetched data.

``` javascript
User.fetch(1);
```

The fetched user now lies in the store and can be retrieved by using the Vuex-ORM actions.

``` javascript
const user = User.find(1);
```

## fetchAll

Fills the store with a list of items.
Returns a promise with the fetched data.

``` javascript
User.fetchAll();
```

Retrieve the fetched users.

``` javascript
User.all();
```

## save

Saves a user instance using post verb.
Returns a promise with the post response.

``` javascript
const user = new User({ name: 'John Doe' });
user.save();
```

## update

Updates an existing user using patch verb.
Returns a promise with the patch response.
The update function also accepts a list of keys for every property that should be part of the patch payload.

``` javascript
// Retrieve the user from the store
const user = User.find(1);
user.name = 'Michelangelo';
// This only updates the name property
user.update(['name']);
```

## replace

Replaces a whole user instance using put verb.
Returns a promise with the put response.

``` javascript
// Retrieve the user from the store
const user = User.find(1);
user.name = 'Michelangelo';
// This only updates the name property
user.replace();
```

## destroy

Destroys a user using the delete verb.
Returns a promise with the delete response.

``` javascript
// Retrieve the user from the store
const user = User.find(1);
user.destroy();
```

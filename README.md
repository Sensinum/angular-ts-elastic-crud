# angular-ts-elastic-crud
Elastic &amp; extendable CRUD Boilerplate for AngularJS (TypeScript)

## Features:
* generate CRUDs just by passing source, row & header templates 
* fully extendable and static typed
* it's not just definitions, Elastic Crud is some kind of library for TypeScript
* maintained by team working on modern Single Page Applications 

Work still in progress...

## Install using Bower
```
bower install angular-ts-elastic-crud
cp -r ./bower_components/angular-ts-elastic-crud/src/app ./your_path_to_lib_directory/angular-ts-elastic-crud
```

## Usage
### Basic usage
In .ts file where you want to use Boilerplate definitions, classes etc. add as reference path *your_path_to_lib_directory*
```
/// <reference path="your_path_to_lib_directory/angular-ts-elastic-crud/components/atec.refs.d.ts" />
```

### More sophisticated usage
In *your_path_to_lib_directory* you can also create new definitions file like ```lib.d.ts``` that contains direct reference to *angular-ts-elastic-crud*
```
/// <reference path="./angular-ts-elastic-crud/components/atec.d.ts" />
```

If you do that like mentioned above in *.ts files your reference should looks like this
```
/// <reference path="your_path_to_lib_directory/lib.d.ts" />
```

## Want to develope & extend it?

Just clone repo and:

```
npm install
bower install
tsd install
```

Add to definition file *atec.refs.d.ts* following line as first one
```
/// <reference path="../../../.tmp/typings/tsd.d.ts" />
```

**Have fun!**

## My project
[![Build Status](https://travis-ci.org/kmassada/laravel-angular.svg?branch=laravel-angular-1.5)](https://travis-ci.org/kmassada/laravel-angular)

## Laravel PHP Framework

[![Build Status](https://travis-ci.org/laravel/framework.svg)](https://travis-ci.org/laravel/framework)
[![Total Downloads](https://poser.pugx.org/laravel/framework/d/total.svg)](https://packagist.org/packages/laravel/framework)
[![Latest Stable Version](https://poser.pugx.org/laravel/framework/v/stable.svg)](https://packagist.org/packages/laravel/framework)
[![Latest Unstable Version](https://poser.pugx.org/laravel/framework/v/unstable.svg)](https://packagist.org/packages/laravel/framework)
[![License](https://poser.pugx.org/laravel/framework/license.svg)](https://packagist.org/packages/laravel/framework)

## Angular Framework

## Official Laravel Documentation

Documentation for the framework can be found on the [Laravel website](http://laravel.com/docs).

## Official Angular Documentation

Documentation for the framework can be found on the [Angular website](https://angularjs.org).

## PROJECT

This is a devops chapter.

- Install Travis CLI tool
gem install travis
- Authenticate to your account
travis login
- Encrypt password and add it to .travis.yml file
travis encrypt DEPLOY_KEY="encryption-password" --add
- Encrypt deploy_id_rsa private RSA key file, that will be used for deploy
openssl aes-256-cbc -k "encryption-password" -in deploy_id_rsa -out config/deploy_id_rsa_enc_travis -a

# .travis.yml
after_success:
  - "openssl aes-256-cbc -k $DEPLOY_KEY -in config/deploy_id_rsa_enc_travis -d -a -out config/deploy_id_rsa"
  - "bundle exec cap deploy"

  # deploy.rb
set :ssh_options, keys: ["config/deploy_id_rsa"] if File.exist?("config/deploy_id_rsa")

[[ $TRAVIS_BRANCH = 'master' ]] && bundle exec cap deploy

gem install capistrano
cap install
set :application, "YourApplicationName"
set :repository, "git@github.com:your-username/your-repository-name.git"
set :deploy_to, "/path/to/your/app"

set :scm, :git
set :branch, "master"

set :user, "bill"
set :use_sudo, false
set :deploy_via, :copy
set :ssh_options, { :forward_agent => true, :port => 4321 }
set :keep_releases, 5
server "www.example.com", :app, :web, :db, :primary => true


### License

The Laravel framework is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)

### Credits LongList

- AUTH
  + [tymondesigns/jwt-auth](https://github.com/tymondesigns/jwt-auth)
  + [barryvdh/laravel-cors](https://github.com/barryvdh/laravel-cors)
  + [Cookies vs Tokens. Getting auth right with Angular.JS](https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/)
  + [AUTH0 starter NodeJS/Angular AUTH app](https://github.com/auth0/angular-token-auth)
  + [Cookie free auth with jwt](http://www.toptal.com/web/cookie-free-authentication-with-json-web-tokens-an-example-in-laravel-and-angularjs)
  + [JWT Debugger](http://jwt.io)

- DEV HELPERS
  + [fzaninotto/Faker](https://github.com/fzaninotto/Faker)
  + [laracasts/Laravel-5-Generators-Extended](https://github.com/laracasts/Laravel-5-Generators-Extended)
  + **irc**: Spot__, epimeth, icebox

- LARAVEL RESOURCES

- ANGULAR RESOURCES
  + [Interceptors in angularjs](http://www.webdeveasy.com/interceptors-in-angularjs-and-useful-examples/)
  + [Angular UI Router](https://github.com/angular-ui/ui-router/wiki/Quick-Reference)
  + [John Papa Style Guide](https://github.com/johnpapa/angular-styleguide)

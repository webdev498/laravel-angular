#PRE REQ
composer self-update
composer install --no-ansi --no-dev --no-interaction --no-progress --no-scripts --optimize-autoloader
# NODE_ENV=production npm install #npm only for dev
bower install --production

#DB SETUP
DB_ROOT_PASSWORD=$1
DB_PASSWORD=$2
SITE=$3
USER=$4

cat >>   $SITE-setup.sql << EOF
CREATE DATABASE ${SITE};
GRANT ALL PRIVILEGES ON ${SITE}.* TO '${USER}'@'localhost' identified by '${DB_PASSWORD}';
FLUSH PRIVILEGES;
EOF
mysql --user="root" --password="${DB_ROOT_PASSWORD}"  < $SITE-setup.sql
rm $SITE-setup.sql

# migrate
php artisan migrate
php artisan migrate:refresh --seed

#touches
sed -i 's/laravel5\-ng\.dev/pioneer.tadbit.cc/g' public/js/app.js

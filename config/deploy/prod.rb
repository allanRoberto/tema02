# Set the deployment directory on the target hosts.
set :deploy_to, "/home/antarticoseguros/sites/#{application}-#{stage}"

# Use the correct branch on github. Uncomment this if you have set up seperate branches for each staging area
# set :branch, "prod"

# The hostnames to deploy to.
role :web, "ftp.antarticoseguros.com.br"

# Specify one of the web servers to use for database backups or updates.
# This server should also be running Wordpress.
role :db, "ftp.antarticoseguros.com.br", :primary => true

# The path to wp-cli
set :wp, "wp"

# The username on the target system, if different from your local username
ssh_options[:user] = 'antarticoseguros'

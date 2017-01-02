# Set the deployment directory on the target hosts.
set :deploy_to, "/home/solucoesparacorretores/sites/#{application}-#{stage}"

# Use the correct branch on github. Uncomment this if you have set up seperate branches for each staging area
set :branch, "dev"

# The hostnames to deploy to.
role :web, "ftp.solucoesparacorretores.com.br"

# Specify one of the web servers to use for database backups or updates.
# This server should also be running Wordpress.
role :db, "ftp.solucoesparacorretores.com.br", :primary => true

# The path to wp-cli
set :wp, "wp"

# The username on the target system, if different from your local username
ssh_options[:user] = 'solucoesparacorretores'

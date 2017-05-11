# Set the deployment directory on the target hosts.
set :deploy_to, "/home/solucoesparacorretores/sites/#{application}-#{stage}"

# Use the correct branch on github. Uncomment this if you have set up seperate branches for each staging area
set :branch, "prod" 

# The hostnames to deploy to.
role :web, "ftp.web2003.uni5.net"

# Specify one of the web servers to use for database backups or updates.
# This server should also be running Wordpress.
role :db, "ftp.web2003.uni5.net", :primary => true 

# The path to wp-cli
set :wp, "wp" #(Should be the full path to the wp command on your server)

# The username on the target system, if different from your local username
ssh_options[:user] = 'solucoesparacorretores' 

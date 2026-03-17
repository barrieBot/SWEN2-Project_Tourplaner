# SWEN2-Project: Online-Tourplaner with Geo-Data Visualisation

Before setup: 

Create a file .env that contains the following variables:
'''
#DB-Env-Data 
DB_NAME=tourplaner_db
DB_USER=tourplaner
DB_PWD=insecure1might2change3later
DB_PORT=5432

#Rounting-Relevant informations
FRONTEND_PORT=8080
CORS_ALLOWED_ORIGINS=http://localhost:4200,https://your_domains.at 
'''

To start, run the command

docker-compose up -d

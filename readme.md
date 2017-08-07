# VEHICLES MANAGEMENT HOMEWORK

# DATABASE DETAILS
Database name = dbVehicle
Database Tables = 
    usertbl: {
        userid - int, not null, auto-increment
        email - varchar(50), not null
        password - varchar(50), not null
    }
    tbvehicle: {
        id - int, not null, auto-increment
        make - varchar(40), not null
        model - varchar(40), not null
        year - char(4), not null
        plate_number - int, not null
        condition_ - char(9), not null
        status - boolean, not null
    }
    
# LOG IN
Make sure database is imported. 

Localhost:3009/login

email: janelle@email.com
password: 123
    

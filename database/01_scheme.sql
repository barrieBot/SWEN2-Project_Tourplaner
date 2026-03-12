-- Postgresql DB-Setup-Script

-- UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Use docker-image postgis/postgis
CREATE EXTENSION IF NOT EXISTS postgis;


CREATE TABLE u_users (
	u_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	u_USERNAME VARCHAR(50) UNIQUE not null,
	u_EMAIL VARCHAR(100) UNIQUE not null,
	u_PWD TEXT not null,
	u_CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE geo_locations (
	geo_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	geo_ADRESS TEXT,
	geo_POSITION GEOGRAPHY(Point, 4326) not null
);


CREATE TABLE t_tours(
	t_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	t_u_ID_owner UUID REFERENCES u_users(u_ID) ON DELETE cascade,
	t_NAME VARCHAR(255) not null,
	t_DESCR TEXT,
	-- Transport-type by enum? or Table?
	t_TRANSPORT_TYPE VARCHAR(20) not null,

	-- Directly saving ORS GeoJson-Response
	t_ORS_ROUTEDATA JSONB,

	-- Data-type integer/float? hmm...
	t_DISTANCE INTEGER,

	-- Saving computed attributes? Calculated here or in the server? Updates?
	  -- t_estimated_time ?
	  -- t_popularity ?
	  -- t_child_friendly ?
	t_CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tm_tour_milestones(
	tm_t_ID UUID REFERENCES t_tours(t_ID) ON DELETE cascade,
	tm_geo_ID_postion UUID REFERENCES geo_locations(geo_ID),
	tm_INDEX_milestone INTEGER not null,
	PRIMARY KEY (tm_t_ID, tm_INDEX_milestone)
);


CREATE TABLE l_logs(
	l_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	l_t_ID UUID REFERENCES t_tours(t_ID) ON DELETE cascade,
	l_TIMESTAMP TIMESTAMP not null,
	l_COMMENT TEXT,
	
	-- Difficulty: How to measure this 1-5 1-10 Age?
	l_DIFFICULTY INTEGER,
	l_RATING INTEGER,
	
	-- Data-type integer/float? hmm...
	t_DISTANCE INTEGER,

	-- Optional: Geotaging the Log for Way-marks or something 
	l_geo_ID_postion UUID REFERENCES location(geo_ID)
);



--Optional: refresh-tokens? To persist login
--CREATE TABLE rt_refresh_tokens (
--	rt_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--	rt_u_ID REFERENCES u_users(u_id) ON DELETE cascade,
--	rt_TOKEN TEXT not null,
--	rt_EXPIRES_AT TIMESTAMP not null 
--);









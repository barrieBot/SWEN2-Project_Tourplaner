-- Postgresql DB-Setup-Script

-- Use docker-image postgis/postgis
CREATE EXTENSION IF NOT EXISTS postgis;


CREATE TABLE u_users (
	u_ID BIGSERIAL PRIMARY KEY,
	u_USERNAME VARCHAR(50) UNIQUE not null,
	u_EMAIL VARCHAR(100) UNIQUE not null,
	u_PWD TEXT not null,
	u_CREATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE geo_locations (
	geo_ID BIGSERIAL PRIMARY KEY,
	geo_ADRESS TEXT,
	geo_POSITION GEOGRAPHY(Point, 4326) not null
);


CREATE TYPE transport_type AS ENUM ('WALKING', 'CYCLING', 'DRIVING', 'PUBLIC')

CREATE TABLE t_tours(
	t_ID BIGSERIAL PRIMARY KEY,
	t_u_ID_owner BIGINT REFERENCES u_users(u_ID) ON DELETE cascade,
	t_NAME VARCHAR(255) not null,
	t_DESCR TEXT,
	-- Transport-type by enum? or Table?
	t_TRANSPORT_TYPE transport_type not null,

	-- Directly saving ORS GeoJson-Response
	t_ORS_ROUTEDATA JSONB,

	-- Data-type integer/float? hmm...
	t_DISTANCE INTEGER,

	-- Saving computed attributes? Calculated here or in the server? Updates?
	  -- t_estimated_time ?
	  -- t_popularity ?
	  -- t_child_friendly ?
	t_CREATED_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tm_tour_milestones(
	tm_t_ID BIGINT REFERENCES t_tours(t_ID) ON DELETE cascade,
	tm_geo_ID_postion BIGINT REFERENCES geo_locations(geo_ID),
	tm_INDEX_milestone INTEGER not null,
	PRIMARY KEY (tm_t_ID, tm_INDEX_milestone)
);


CREATE TABLE l_logs(
	l_ID BIGSERIAL PRIMARY KEY,
	l_t_ID BIGINT NOT NULL REFERENCES t_tours(t_ID) ON DELETE cascade,
	l_TIMESTAMP TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	l_COMMENT TEXT,

	-- Difficulty: How to measure this 1-5 1-10 Age?
	l_DIFFICULTY SMALLINT CHECK (l_DIFFICULTY BETWEEN 1 AND 5)
	l_RATING SMALLINT CHECK (l_RATING BETWEEN 1 AND 5),

	-- Data-type integer/float? hmm...
	t_DISTANCE INTEGER,

	-- Optional: Geotaging the Log for Way-marks or something 
	l_geo_ID_postion BIGINT REFERENCES geo_locations(geo_ID)
);


--Optional: Spatial Index for Proximity
--CREATE INDEX idx_geo_locations_position on geo_locations USING GIST(geo_POSITION);


--Optional: refresh-tokens? To persist login
--CREATE TABLE rt_refresh_tokens (
--	rt_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--	rt_u_ID REFERENCES u_users(u_id) ON DELETE cascade,
--	rt_TOKEN TEXT not null,
--	rt_EXPIRES_AT TIMESTAMP not null 
--);









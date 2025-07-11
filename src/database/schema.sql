-- Create table for tracking ad impressions
CREATE TABLE ad_impressions (
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES Games(id),
    related_game_id INTEGER REFERENCES Games(id),
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_id UUID REFERENCES auth.users(id)
);

-- Create index for faster queries
CREATE INDEX idx_ad_impressions_game_id ON ad_impressions(game_id);
CREATE INDEX idx_ad_impressions_related_game_id ON ad_impressions(related_game_id);
CREATE INDEX idx_ad_impressions_viewed_at ON ad_impressions(viewed_at); 
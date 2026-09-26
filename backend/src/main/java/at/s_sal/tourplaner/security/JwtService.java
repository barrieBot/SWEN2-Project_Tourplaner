package at.s_sal.tourplaner.security;

import at.s_sal.tourplaner.config.securityProperty.JwtSecurityProperties;
import at.s_sal.tourplaner.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class JwtService {

    private final JwtSecurityProperties jwtSecrets;

    private SecretKey signWithKey(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecrets.jwtSecret()));
    }

    public Optional<TokenHolder> extractIfValidToken(String token) {
        try{
            Claims claims = Jwts.parser()
                    .verifyWith(signWithKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            return Optional.of(new TokenHolder(claims.get("uid", Long.class), claims.getSubject()));
        } catch (JwtException | IllegalArgumentException e) {
            return Optional.empty();
        }
    }


    public String generateToken(User user){
        return Jwts.builder()
                .subject(user.getEmail())
                .claim("uid", user.getId())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + jwtSecrets.jwtExpirationMS()))
                .signWith(signWithKey())
                .compact();
    }



}

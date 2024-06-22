package com.uade.api.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class JwtAuthFilter extends OncePerRequestFilter {
    private final SecretKey secretKey;

    public JwtAuthFilter(SecretKey secretKey) {
        this.secretKey = secretKey;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = extractJwtFromRequest(request);

            if (token != null && validateToken(token)) {
                String username = extractUsernameFromToken(token);
                List<GrantedAuthority> authorities = extractRoleFromToken(token);

                if (username != null) {
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                            username, null, authorities);
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            }
            // Continue the filter chain only if no exception is thrown
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            SecurityContextHolder.clearContext();
            if (!response.isCommitted()) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage());
            } else {
                logger.error("Response has already been committed. Unable to send error.", e);
            }
        }
    }
    private String extractJwtFromRequest(HttpServletRequest request) {
        // Extraer el token de la cabecera de autorización
        String bearerToken = request.getHeader("Authorization");

        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7); // Excluir "Bearer "
        }

        return null;
    }

    private boolean validateToken(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token);

            // Verifica la firma y la expiración del token
            if (isTokenSignatureValid(claimsJws) && isTokenNotExpired(claimsJws.getPayload().getExpiration())) {
                return true;
            }
        } catch (Exception e) {
            System.out.println("ERROR: " + e.getMessage());
        }

        return false;
    }

    private boolean isTokenSignatureValid(Jws<Claims> claimsJws) {
        // Verifica la firma del token con la clave secreta
        try {
            claimsJws.getPayload(); // Esto lanzará una excepción si la firma es inválida
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private boolean isTokenNotExpired(Date expirationDate) {
        // Verifica si la fecha de expiración del token es posterior a la fecha actual
        return expirationDate != null && !expirationDate.before(new Date());
    }

    private String extractUsernameFromToken(String token) {
        try {
            Claims claims = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload();

            // Extraer el nombre de usuario de la carga útil del token
            String username = claims.getSubject();
            return username;
        } catch (Exception e) {
            // Manejar cualquier excepción que pueda ocurrir al analizar el token
            this.logger.error("Could not extract username from token");
            System.out.println(e.getMessage());
            return null;
        }
    }
    private List<GrantedAuthority> extractRoleFromToken(String token) {
        try {
            Claims claims = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload();
            String rol = claims.get("rol", String.class);
            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(rol));
            return authorities;
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }
}

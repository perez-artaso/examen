import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('TIST');
}


JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost', '127.0.0.1'],
        authScheme: ''
      }
})

const decodedToken = this.jwt.decodeToken(serverResponse.message);
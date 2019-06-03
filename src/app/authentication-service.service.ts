import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


export interface UserDetails {
  _id: string;
  index:string;
  email: string;
  name: string;
  exp: number;
  iat: number;
  admin:boolean;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;

}

@Injectable()
export class AuthenticationServiceService {
  private token: string;

  private url = 'http://localhost';
  private socket;    

  constructor(private http: HttpClient, private router: Router) {

    
  }



  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  
  public isAdmin(): boolean {
    const user = this.getUserDetails();
    //console.log(user);
    if (user) {
      return user.admin;
    } else {
      return false;
    }
  }



  private request(method: 'post'|'get', type: "reset"|"answercount"|"delpredefine"|"reportanswer"|"deluser"|"allanswer"| 'addpredefine'|'updatepredefine'|'predefines'|'predefine'|'login'|'updateuser'|'updateimage'|'addanswer'|'register'|'userindex'|'profile'|'imagebyindex' |'users'|'upload'|'user'|'images'|'addimage'|'image', mdata?: any): Observable<any> {
    let base;


    if (method === 'post') {
      base = this.http.post(window.location.protocol + '//' + window.location.hostname + `:3000/api/${type}`, mdata, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    } else {
      base = this.http.get(window.location.protocol + '//' + window.location.hostname + `:3000/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        console.log("piping req....");
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public resetPassword(user): Observable<any> {
    return this.request('post', 'reset',user);
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  public users(): Observable<any> {
    return this.request('get', 'users');
  } 

  public user(user): Observable<any> {
    return this.request('post', 'user',user);
  } 

  public deleteUser(user): Observable<any> {
    return this.request('post', 'deluser',user);
  } 

  public addimage(image): Observable<any> {
    return this.request('post', 'addimage',image);
  } 
  
  public predefine(predefine): Observable<any> {
    return this.request('post', 'predefine',predefine);
  } 

  public predefines(): Observable<any> {
    return this.request('get', 'predefines');
  } 

  public addpredefine(pre): Observable<any> {
    return this.request('post', 'addpredefine',pre);
  } 

  public delpredefine(id): Observable<any> {
    return this.request('post', 'delpredefine',id);
  } 


  public updatePredefine(pre): Observable<any> {
    return this.request('post', 'updatepredefine',pre);
  } 


  public image(image): Observable<any> {
    return this.request('post', 'image',image);
  } 

  public imageByIndex(image): Observable<any> {
    return this.request('post', 'imagebyindex',image);
  } 

  public answer(ans): Observable<any> {
    return this.request('post', 'addanswer',ans);
  } 

  public reportanswer(dates): Observable<any> {
    return this.request('post', 'reportanswer',dates);
  } 

  public images(): Observable<any> {
    return this.request('get', 'images');
  } 

  public updateImage(image): Observable<any> {
    return this.request('post', 'updateimage',image);
  } 

  public updateUser(user): Observable<any> {
    return this.request('post', 'updateuser',user);
  } 

  public getUserIndex(): Observable<any> {
    return this.request('get', 'userindex');
  } 
  
  public AnswersCount(user): Observable<any> {
    return this.request('post', 'answercount',user);
  } 

  public getAnswersByUser(user): Observable<any> {
    return this.request('post', 'allanswer',user);
  } 

  public upload(): Observable<any> { 
    return this.http.post(window.location.protocol + '//' + window.location.hostname + `:3000/api/upload`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/login');
  }
}

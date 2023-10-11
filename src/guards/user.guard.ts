import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/models/user.model";

@Injectable()
export class UserGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    async canActivate(context: ExecutionContext){
        const req = context.switchToHttp().getRequest();
        
        const authHeader = req.headers.authorization;
        if(!authHeader) throw new UnauthorizedException('User Unauthorized');

        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];
        if(bearer != 'Bearer' || !token) throw new UnauthorizedException('User Unauthorized');

        try {
            
            const user: Partial<User> = await this.jwtService.verify(token, {
                secret: process.env.ACCESS_TOKEN_KEY
            });

            if(!user) throw new UnauthorizedException('Invalid token provided');

            if(!user.is_active) throw new BadRequestException('User is not active');

            req.userId = user.id;

            return true;
        } catch (error) {
            throw new UnauthorizedException('Token verify error');
        }
    } 
}
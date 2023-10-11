import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Admin } from "../admin/models/admin.model";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    async canActivate(context: ExecutionContext){
        const req = context.switchToHttp().getRequest();
        
        const authHeader = req.headers.authorization;
        if(!authHeader) throw new UnauthorizedException('Admin Unauthorized');

        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];
        if(bearer != 'Bearer' || !token) throw new UnauthorizedException('Admin Unauthorized');

        try {
            
            const admin: Partial<Admin> = await this.jwtService.verify(token, {
                secret: process.env.ACCESS_TOKEN_KEY
            });

            if(!admin) throw new UnauthorizedException('Invalid token provided');

            if(!admin.is_active) throw new BadRequestException('Admin is not active');

            req.adminId = admin.id;

            return true;
        } catch (error) {
            throw new UnauthorizedException('Token verify error');
        }
    } 
}


















// import { BadRequestException, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
// import { JwtService } from "@nestjs/jwt";
// import { Admin } from "../admin/models/admin.model";


// export class AdminGuard implements CanActivate {
//     constructor (
//         private readonly jwtService: JwtService
//     ) {}

//     async canActivate(context: ExecutionContext): Promise<boolean>  {
        
//         const req = context.switchToHttp().getRequest();

//         const authHeader = req.headers.authorization;
//         if (!authHeader) {
//             throw new UnauthorizedException('Admin Unauthorized');
//         }

//         const bearer = authHeader.split(' ')[0];
//         const token = authHeader.split(' ')[1];
//         if (bearer != 'Bearer' || !token) {
//             throw new UnauthorizedException('Admin Unauthorized');
//         }

//         try {
            
//             const admin: Partial<Admin> = await this.jwtService.verify(token, {
//                 secret: process.env.ACCESS_TOKEN_KEY
//             });

//             if(!admin) throw new UnauthorizedException('Invalid token provided');

//             if(!admin.is_active) throw new BadRequestException('Admin is not active');

//             req.userId = admin.id;

//             return true;
//         } catch (error) {
//             throw new UnauthorizedException('Token verify error');
//         }
//     }
// }
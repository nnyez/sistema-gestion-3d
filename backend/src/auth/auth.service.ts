import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.usuariosService.findByEmail(dto.email);
    if (existing) throw new ConflictException('El email ya está registrado');

    const usuario = await this.usuariosService.create(dto.nombre, dto.email, dto.telefono, dto.password);
    return this.generateToken(usuario);
  }

  async login(dto: LoginDto) {
    const usuario = await this.usuariosService.findByEmail(dto.email);
    if (!usuario) throw new UnauthorizedException('Credenciales inválidas');

    const valid = await bcrypt.compare(dto.password, usuario.password_hash);
    if (!valid) throw new UnauthorizedException('Credenciales inválidas');

    return this.generateToken(usuario);
  }

  private generateToken(usuario: any) {
    const payload = { sub: usuario.id, email: usuario.email };
    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    };
  }
}

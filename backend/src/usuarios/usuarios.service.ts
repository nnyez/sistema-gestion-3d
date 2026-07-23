import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepo.findOne({ where: { email } });
  }

  async findById(id: number): Promise<Usuario | null> {
    return this.usuarioRepo.findOne({ where: { id } });
  }

  async create(nombre: string, email: string, telefono: string, password: string): Promise<Usuario> {
    const salt = await bcrypt.genSalt();
    const password_hash = await bcrypt.hash(password, salt);
    const usuario = this.usuarioRepo.create({ nombre, email, telefono, password_hash });
    return this.usuarioRepo.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepo.find();
  }
}

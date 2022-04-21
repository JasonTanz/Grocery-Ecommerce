import { Inject, Injectable } from '@nestjs/common';
import { admin } from 'src/models/admin';
import { CreateAdminInput } from './dto/create-admin.input';
import { Logger } from '@nestjs/common';
@Injectable()
export class AdminService {
  constructor(
    @Inject('ADMIN_REPOSITORY') private readonly adminRepo: typeof admin,
  ) {}

  async findByEmail(email: string): Promise<admin> {
    Logger.log(`Fetching admin by admin's email ${email}`);
    return await this.adminRepo.findOne<admin>({
      where: {
        admin_email: email,
      },
    });
  }

  async findById(id: string): Promise<admin> {
    Logger.log(`Fetching admin by admin's id ${id}`);
    return await this.adminRepo.findOne<admin>({
      where: {
        admin_id: id,
      },
    });
  }

  async updateById(id: string, data: CreateAdminInput) {
    Logger.log(`Updating admin by admin's id`);
    return await this.adminRepo.update<admin>(data, {
      where: {
        admin_id: id,
      },
      returning: true,
    });
  }

  async createAdmin(data: CreateAdminInput): Promise<admin> {
    Logger.log(`Creating new admin...`);
    return await this.adminRepo.create<admin>({
      admin_email: data.admin_email,
      admin_username: data.admin_username,
      admin_password: data.admin_password,
    });
  }
}

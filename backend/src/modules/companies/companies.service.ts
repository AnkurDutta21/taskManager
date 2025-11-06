import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = this.companiesRepository.create(createCompanyDto);
    return await this.companiesRepository.save(company);
  }

  async findAll(page: number = 1, limit: number = 10, search?: string) {
    const query = this.companiesRepository.createQueryBuilder('company');

    if (search) {
      query.where(
        'company.companyName ILIKE :search OR company.companyCode ILIKE :search',
        { search: `%${search}%` },
      );
    }

    const [companies, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: companies,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companiesRepository.findOne({
      where: { id },
      relations: ['departments', 'users'],
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    return company;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    const company = await this.findOne(id);
    Object.assign(company, updateCompanyDto);
    return await this.companiesRepository.save(company);
  }

  async remove(id: number): Promise<void> {
    const company = await this.findOne(id);
    await this.companiesRepository.remove(company);
  }

  async getStatistics(id: number) {
    const company = await this.companiesRepository.findOne({
      where: { id },
      relations: ['departments', 'users'],
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    return {
      totalDepartments: company.departments?.length || 0,
      totalEmployees: company.users?.length || 0,
    };
  }
}

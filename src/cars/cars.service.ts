import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as UUID } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';


@Injectable()
export class CarsService {
    private cars: Car[] = [
        {
            id: UUID(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: UUID(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: UUID(),
            brand: 'Jeep',
            model: 'Cherokee'
        },
    ];

    findAll() {
        return this.cars
    }

    findOneById(id: string) {

        const car = this.cars.find(car => car.id === id);

        if (!car) {
            throw new NotFoundException(`Carro con el id '${id}' no fue encontrado`);
        }

        return car
    }

    create(createCarDto: CreateCarDto) {

        const car: Car = {
            id: UUID(),
            ...createCarDto
        }
        this.cars.push(car);

        return car

    }

    update(id: string, updateCarDto: UpdateCarDto) { }
}

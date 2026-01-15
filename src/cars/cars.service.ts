import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as UUID } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';


@Injectable()
export class CarsService {
    private cars: Car[] = [
        // {
        //     id: UUID(),
        //     brand: 'Toyota',
        //     model: 'Corolla'
        // },
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

    update(id: string, updateCarDto: UpdateCarDto) {
        let carDB = this.findOneById(id);

        if (updateCarDto.id && updateCarDto.id !== id)
            throw new BadRequestException(`La id del carro no es valida`);

        this.cars = this.cars.map(car => {
            if (car.id === id) {
                carDB = {
                    ...carDB,
                    ...updateCarDto,
                    id,
                }
                return carDB
            }
            return car
        })

        return carDB;
    }

    delete(id: string) {
        const car = this.findOneById(id);
        this.cars = this.cars.filter(car => car.id !== id);
    }

    fillCarsWithSeedData(cars: Car[]) {
        this.cars = cars
    }


}

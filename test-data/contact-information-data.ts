import { faker } from "@faker-js/faker";

export interface ContactInformationData {
    readonly email: string;
    readonly fullName: string;
    readonly phoneNumber: string;
    readonly comment: string;
}

function generateLithuanianPhoneNumber(): string {
    return `+370${faker.number.int({ min: 10000000, max: 99999999 })}`;
}

export function getContactInformationData(): ContactInformationData {
    return {
        email: faker.internet.email(),
        fullName: faker.person.firstName(),
        phoneNumber: generateLithuanianPhoneNumber(),
        comment: faker.string.numeric(6),
    };
}

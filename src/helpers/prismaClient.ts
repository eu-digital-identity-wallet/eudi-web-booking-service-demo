import { PrismaClient } from "@prisma/client";
import { Container } from "typedi";

const prisma = new PrismaClient();

Container.set(PrismaClient, prisma);

export default prisma;

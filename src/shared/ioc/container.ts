import 'reflect-metadata'
import { Container } from 'inversify'
// import { TYPES } from './types'

const container = new Container()

// container.bind<NodeCache>(TYPES.NodeCache).toConstantValue(new NodeCache())

export { container }

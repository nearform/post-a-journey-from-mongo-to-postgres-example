import { SchemaTypes } from 'mongoose';
import { mongoose } from '../infrastructure/mongo.client';

export const Product = mongoose.model('Product', new mongoose.Schema({
  id: {
    required: true,
    type: SchemaTypes.String
  },
  name: {
    required: true,
    type: SchemaTypes.String
  }
}, { versionKey: false }))

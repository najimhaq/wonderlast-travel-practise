'use client';

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  Select,
  TextArea,
  TextField,
} from '@heroui/react';
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100';

const AddDestinationPage = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const destination = Object.fromEntries(formData.entries());
    console.log(destination);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/destination`,
      {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(destination),
      }
    );
    const data = await response.json();
    toast.success('Destination added successfully!');
    redirect('/destinations');
  };

  return (
    <div className='mx-auto max-w-5xl px-4 py-8 md:px-6'>
      <div className='mb-8 text-center'>
        <h1 className='text-3xl font-bold text-cyan-600 md:text-4xl'>
          Add Destination
        </h1>
        <p className='mt-2 text-sm text-gray-500 md:text-base'>
          Create a new travel package with clear and complete details.
        </p>
      </div>

      <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8'>
        <Form
          onSubmit={handleSubmit}
          validationBehavior='native'
          className='space-y-8'
        >
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='md:col-span-2'>
              <TextField name='destinationName' isRequired>
                <Label>Destination Name</Label>
                <Input className={inputClass} placeholder='Bali Paradise' />
                <Description>
                  Use a short, catchy name for the package.
                </Description>
                <FieldError />
              </TextField>
            </div>

            <TextField name='country' isRequired>
              <Label>Country</Label>
              <Input className={inputClass} placeholder='Indonesia' />
              <FieldError />
            </TextField>

            <Select
              name='category'
              isRequired
              fullWidth
              placeholder='Select category'
              className='w-full'
            >
              <Label>Category</Label>
              <Select.Trigger className={inputClass}>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>
                  <ListBox.Item id='Beach' textValue='Beach'>
                    Beach
                  </ListBox.Item>
                  <ListBox.Item id='Mountain' textValue='Mountain'>
                    Mountain
                  </ListBox.Item>
                  <ListBox.Item id='City' textValue='City'>
                    City
                  </ListBox.Item>
                  <ListBox.Item id='Adventure' textValue='Adventure'>
                    Adventure
                  </ListBox.Item>
                  <ListBox.Item id='Cultural' textValue='Cultural'>
                    Cultural
                  </ListBox.Item>
                  <ListBox.Item id='Luxury' textValue='Luxury'>
                    Luxury
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>

            <TextField name='price' type='number' isRequired>
              <Label>Price (USD)</Label>
              <Input
                type='number'
                min={0}
                className={inputClass}
                placeholder='1299'
              />
              <Description>Enter the base package price in USD.</Description>
              <FieldError />
            </TextField>

            <TextField name='duration' isRequired>
              <Label>Duration</Label>
              <Input className={inputClass} placeholder='7 Days / 6 Nights' />
              <FieldError />
            </TextField>

            <TextField name='departureDate' type='date' isRequired>
              <Label>Departure Date</Label>
              <Input type='date' className={inputClass} />
              <FieldError />
            </TextField>

            <TextField
              name='imageUrl'
              type='url'
              isRequired
              className='md:col-span-2'
            >
              <Label>Image URL</Label>
              <Input
                type='url'
                className={inputClass}
                placeholder='https://example.com/bali-paradise.jpg'
              />
              <Description>
                Add a direct image link for destination preview.
              </Description>
              <FieldError />
            </TextField>

            <TextField name='description' isRequired className='md:col-span-2'>
              <Label>Description</Label>
              <TextArea
                className='w-full rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 min-h-36'
                placeholder='Describe the travel experience, highlights, accommodation, and activities...'
              />
              <Description>
                Write a clear summary of what travelers will experience.
              </Description>
              <FieldError />
            </TextField>
          </div>

          <div className='flex flex-col gap-3 pt-2 sm:flex-row'>
            <Button
              type='submit'
              className='h-12 w-full rounded-xl bg-cyan-500 text-white hover:bg-cyan-600 sm:w-auto sm:px-8'
            >
              Add Destination
            </Button>

            <Button
              type='reset'
              variant='outline'
              className='h-12 w-full rounded-xl border border-gray-300 bg-white text-gray-700 sm:w-auto sm:px-8'
            >
              Reset Form
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddDestinationPage;

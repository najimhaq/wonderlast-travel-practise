'use client';

import {
  Button,
  FieldError,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  Select,
  Description,
  ListBox,
  TextArea,
  Form,
} from '@heroui/react';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100';

export function EditModal({ destination }) {
  const {
    _id,
    imageUrl,
    destinationName,
    country,
    category,
    price,
    duration,
    departureDate,
    description,
  } = destination;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries());
    console.log(destination); // এখন সব ডেটা আসবে

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${_id}`,
      {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(destination),
      }
    );
    const data = await response.json();
    console.log(data);
    toast.success('Destination updated successfully!');
  };

  return (
    <Modal>
      <div>
        <Button
          variant='bordered'
          className='h-11 rounded-lg border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 border-2 transition hover:bg-cyan-50'
        >
          <span className='inline-flex items-center gap-2'>
            <FaEdit className='text-sm' />
            Edit
          </span>
        </Button>
      </div>
      <Modal.Backdrop>
        <Modal.Container placement='auto'>
          <Modal.Dialog className='sm:max-w-md'>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className='bg-accent-soft text-accent-soft-foreground'>
                <FaEdit className='size-5' />
              </Modal.Icon>
              <Modal.Heading>Edit Destination</Modal.Heading>
              <p className='mt-1.5 text-sm leading-5 text-muted'>
                Fill out the form below and we&apos;ll get back to you.
              </p>
            </Modal.Header>
            <Modal.Body className='p-6'>
              <Surface variant='default'>
                <Form
                  onSubmit={handleSubmit}
                  validationBehavior='native'
                  className='space-y-8'
                >
                  <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    <div className='md:col-span-2'>
                      <TextField
                        defaultValue={destinationName}
                        name='destinationName'
                        isRequired
                      >
                        <Label>Destination Name</Label>
                        <Input className={inputClass} />
                        <Description>
                          Use a short, catchy name for the package.
                        </Description>
                        <FieldError />
                      </TextField>
                    </div>

                    <TextField defaultValue={country} name='country' isRequired>
                      <Label>Country</Label>
                      <Input className={inputClass} placeholder='Indonesia' />
                      <FieldError />
                    </TextField>

                    {/* ✅ defaultSelectedKey যোগ করা হয়েছে */}
                    <Select
                      name='category'
                      isRequired
                      defaultSelectedKey={category}
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

                    <TextField
                      defaultValue={price}
                      name='price'
                      type='number'
                      isRequired
                    >
                      <Label>Price (USD)</Label>
                      <Input
                        type='number'
                        min={0}
                        className={inputClass}
                        placeholder='1299'
                      />
                      <Description>
                        Enter the base package price in USD.
                      </Description>
                      <FieldError />
                    </TextField>

                    <TextField
                      defaultValue={duration}
                      name='duration'
                      isRequired
                    >
                      <Label>Duration</Label>
                      <Input
                        className={inputClass}
                        placeholder='7 Days / 6 Nights'
                      />
                      <FieldError />
                    </TextField>

                    <TextField
                      defaultValue={departureDate}
                      name='departureDate'
                      type='date'
                      isRequired
                    >
                      <Label>Departure Date</Label>
                      <Input type='date' className={inputClass} />
                      <FieldError />
                    </TextField>

                    <TextField
                      defaultValue={imageUrl}
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

                    <TextField
                      defaultValue={description}
                      name='description'
                      isRequired
                      className='md:col-span-2'
                    >
                      <Label>Description</Label>
                      {/* ✅ name="description" যোগ করা হয়েছে */}
                      <TextArea
                        name='description'
                        className='w-full rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 min-h-36'
                        placeholder='Describe the travel experience...'
                      />
                      <Description>
                        Write a clear summary of what travelers will experience.
                      </Description>
                      <FieldError />
                    </TextField>
                  </div>

                  <Modal.Footer>
                    <Button type='submit' slot='close'>
                      Save
                    </Button>
                  </Modal.Footer>
                </Form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

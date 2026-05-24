'use client';

import { AlertDialog, Button } from '@heroui/react';
import { redirect } from 'next/navigation';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

export function DeleteDestination({ destination }) {
  const { _id, destinationName } = destination;
  const handleDelete = async () => {
    const response = await fetch(`http://localhost:5050/destination/${_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
    toast.success('Destination deleted successfully!');
    redirect('/destinations');
  };
  return (
    <AlertDialog>
      <Button
        variant='bordered'
        className='h-11 rounded-lg border-red-200 bg-white px-4 text-sm font-medium text-red-500 border-2 transition hover:bg-red-50'
      >
        <span className='inline-flex items-center gap-2'>
          <FaTrashAlt className='text-sm' />
          Delete
        </span>
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className='sm:max-w-100'>
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status='danger' />
              <AlertDialog.Heading>
                Delete {destinationName} permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{destinationName}</strong>{' '}
                and all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot='close' variant='tertiary'>
                Cancel
              </Button>
              <Button onClick={handleDelete} slot='close' variant='danger'>
                Delete {destinationName}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}

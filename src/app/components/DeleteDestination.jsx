'use client';

import { AlertDialog, Button } from '@heroui/react';
import { useRouter } from 'next/navigation'; // ← পরিবর্তন ১: redirect এর জায়গায় useRouter
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

export function DeleteDestination({ destination }) {
  const router = useRouter(); // ← পরিবর্তন ২: router তৈরি
  const { _id, destinationName } = destination;

  const handleDelete = async () => {
    // ← পরিবর্তন ৩: URL থেকে ডাবল স্ল্যাশ সরানো
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/+$/, '');

    const response = await fetch(
      `${baseUrl}/destination/${_id}`, // ← পরিবর্তন ৪: baseUrl ব্যবহার
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', // ← পরিবর্তন ৫: content-type → Content-Type
        },
      }
    );
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      toast.success('Destination deleted successfully!');
      router.push('/destinations'); // ← পরিবর্তন ৬: redirect → router.push
      router.refresh(); // ← পরিবর্তন ৭: পেজ রিফ্রেশ
    } else {
      toast.error(data.message || 'Delete failed');
    }
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

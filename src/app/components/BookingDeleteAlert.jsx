'use client';

import { AlertDialog, Button } from '@heroui/react';

export function BookingDeleteAlert({ handleCancel }) {
  return (
    <AlertDialog>
      {/* Trigger button — শুধু popup খুলবে, delete করবে না */}
      <AlertDialog.Trigger>
        <button className='cursor-pointer flex items-center gap-2 rounded-xl border border-red-300 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50'>
          🗑 Cancel
        </button>
      </AlertDialog.Trigger>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className='sm:max-w-100'>
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status='danger' />
              <AlertDialog.Heading>Cancel this booking?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently cancel your booking. This action cannot be
                undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              {/* এই button শুধু popup বন্ধ করবে */}
              <Button slot='close' variant='tertiary'>
                Keep Booking
              </Button>
              {/* এই button delete করবে তারপর popup বন্ধ করবে */}
              <Button slot='close' variant='danger' onPress={handleCancel}>
                Yes, Cancel Booking
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}

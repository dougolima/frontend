import React, { useEffect } from 'react';

import FormSegment from '@containers/Forms/Segment';

// extract idPrescription from slug.
const extractId = slug => slug.match(/([0-9]+)$/)[0];

export default function EditSegment({ match, segment, fetchSegmentById }) {
  const id = parseInt(extractId(match.params.slug));
  const { description, departments } = segment.content;

  const initialValues = {
    id,
    description: description || '',
    departments: departments || []
  };

  useEffect(() => {
    fetchSegmentById(id);
  }, [id, fetchSegmentById]);

  const afterSaveSegment = () => {
    fetchSegmentById(id);
  };

  return <FormSegment initialValues={initialValues} afterSaveSegment={afterSaveSegment} />;
}

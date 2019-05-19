import React, { useState } from 'react';
import { Col, Card, CardHeader, CardBody, CardFooter, Button } from 'reactstrap';
import TagsInput from './TagsInput';
import { useSubmit } from 'hooks';
import * as api from 'api';

const TagsCard = ({ id, tags, refreshTask }) => {
  const updateTags = useSubmit(api.tag.updateObjectTags, refreshTask);
  const [value, setValue] = useState(tags);

  const submit = () => {
    const params = { id, oldTags: tags, newTags: value };
    return updateTags(params);
  };

  return (
    <Card>
      <CardHeader>
        <strong>Tags</strong>
      </CardHeader>
      <CardBody>
        <Col xs="12" md="9">
          <TagsInput tags={value} onChange={setValue} />
        </Col>
      </CardBody>
      <CardFooter>
        <Button type="submit" size="sm" color="primary" onClick={submit}>
          Save
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TagsCard;

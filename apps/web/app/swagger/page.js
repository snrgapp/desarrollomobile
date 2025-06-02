'use client';

import { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function SwaggerDocsPage() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    fetch('/api/swagger')
      .then(res => res.json())
      .then(data => setSpec(data));
  }, []);

  if (!spec) return <p>Cargando Swagger UI...</p>;

  return (
    <div style={{ height: '100vh' }}>
      <SwaggerUI spec={spec} />
    </div>
  );
}

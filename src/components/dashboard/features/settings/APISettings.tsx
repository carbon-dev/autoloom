import React from 'react';
import { Copy, Key } from 'lucide-react';
import { Button } from '../../shared/Button';
import { Alert } from '../../shared/Alert';
import { TextInput } from '../../shared/TextInput';

export const APISettings: React.FC = () => {
  const [apiKey, setApiKey] = React.useState('sk_test_1234567890abcdef');
  const [showKey, setShowKey] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleRegenerateKey = () => {
    // In a real app, this would make an API call to generate a new key
    setApiKey(`sk_test_${Math.random().toString(36).substring(2)}`);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-6">
        API Settings
      </h3>

      <div className="space-y-4">
        <Alert type="info" title="API Access">
          Use your API key to access our API endpoints. Keep this key secret and never share it publicly.
        </Alert>

        <div className="space-y-4">
          <TextInput
            label="API Key"
            type={showKey ? 'text' : 'password'}
            value={apiKey}
            readOnly
            leftIcon={<Key className="h-5 w-5" />}
            rightElement={
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyKey}
                leftIcon={<Copy className="h-4 w-4" />}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            }
          />

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? 'Hide' : 'Show'} API Key
            </Button>
            <Button
              variant="danger"
              onClick={handleRegenerateKey}
            >
              Regenerate Key
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Quick Start
          </h4>
          <div className="bg-gray-50 rounded-md p-4">
            <pre className="text-sm text-gray-600 overflow-x-auto">
              {`curl -X POST \\
  https://api.example.com/v1/remove-background \\
  -H "Authorization: Bearer ${apiKey}" \\
  -F "image=@image.jpg"`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}; 
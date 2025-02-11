import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

const faqs = [
  {
    question: 'How does the background removal work?',
    answer: 'Our AI-powered tool uses advanced machine learning algorithms to detect and separate the foreground subject from the background. It works with a wide variety of images and can handle complex details like hair and transparent objects.',
  },
  {
    question: 'What image formats are supported?',
    answer: 'We support all major image formats including JPG, PNG, and WEBP. The processed images can be downloaded in PNG format with transparent backgrounds.',
  },
  {
    question: 'Is there a limit to image size?',
    answer: 'Free users can upload images up to 5MB in size. Pro and Enterprise users can upload images up to 25MB.',
  },
  {
    question: 'How long does processing take?',
    answer: 'Most images are processed within seconds. Processing time may vary depending on image size and complexity.',
  },
  {
    question: 'Can I batch process multiple images?',
    answer: 'Yes, Pro and Enterprise users can upload and process multiple images simultaneously.',
  },
];

interface FAQProps {
  className?: string;
}

export const FAQ: React.FC<FAQProps> = ({ className = '' }) => {
  return (
    <div className={cn('bg-white py-24 sm:py-32', className)}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          <ChevronDown
                            className={cn(
                              'h-6 w-6 transform',
                              open ? '-rotate-180' : 'rotate-0'
                            )}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}; 
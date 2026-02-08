import React from 'react';

const Careers = () => {
    const positions = [
        {
            title: 'Senior Fashion Buyer',
            department: 'Merchandising',
            location: 'New York, NY',
            type: 'Full-time'
        },
        {
            title: 'Digital Marketing Manager',
            department: 'Marketing',
            location: 'Remote',
            type: 'Full-time'
        },
        {
            title: 'Frontend Developer',
            department: 'Engineering',
            location: 'Remote',
            type: 'Full-time'
        },
        {
            title: 'Customer Experience Lead',
            department: 'Operations',
            location: 'London, UK',
            type: 'Part-time'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 min-h-screen">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Join Our Team</h1>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                    At LuxeThreads, we are always looking for passionate individuals who share our vision for sustainable luxury.
                </p>
            </div>

            <div className="grid gap-6 max-w-4xl mx-auto">
                {positions.map((job, index) => (
                    <div key={index} className="bg-white border border-gray-100 p-8 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-lg transition-shadow group">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-accent transition-colors">{job.title}</h3>
                            <div className="flex gap-4 mt-2 text-sm text-gray-500">
                                <span>{job.department}</span>
                                <span>•</span>
                                <span>{job.location}</span>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-col items-end">
                            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                                {job.type}
                            </span>
                            <button className="text-primary font-semibold text-sm hover:underline">Apply Now</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-20 text-center bg-gray-50 p-12 rounded-2xl">
                <h3 className="text-2xl font-serif font-bold mb-4">Don't see your role?</h3>
                <p className="text-gray-500 mb-8">
                    We are growing fast. Send your resume to <span className="text-primary font-semibold">careers@luxethreads.com</span> and we will keep you on file.
                </p>
            </div>
        </div>
    );
};

export default Careers;

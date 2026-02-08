import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const ContactApp = () => {
    const form = useRef();
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus('loading');

        // Replace these with your actual IDs
        // Service ID provided by user: service_jq422l9
        const SERVICE_ID = "service_jq422l9";
        const TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // Placeholder
        const PUBLIC_KEY = "YOUR_PUBLIC_KEY";   // Placeholder

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
                setStatus('success');
                form.current.reset();
                setTimeout(() => setStatus('idle'), 5000);
            }, (error) => {
                console.log(error.text);
                setStatus('error');
                setErrorMessage('Failed to send. Please try again or check console.');
            });
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-white overflow-y-auto">
            <div className="w-full max-w-md bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 mb-2">
                        Get in Touch
                    </h1>
                    <p className="text-white/60 text-sm">
                        Have a project in mind? Let's talk.
                    </p>
                </div>

                {status === 'success' ? (
                    <div className="flex flex-col items-center justify-center py-10 animate-in fade-in zoom-in duration-300">
                        <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                        <p className="text-white/60 text-center">
                            Thanks for reaching out. I'll get back to you soon.
                        </p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="mt-6 text-sm text-white/40 hover:text-white transition-colors"
                        >
                            Send another message
                        </button>
                    </div>
                ) : (
                    <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-5">
                        <div className="group">
                            <label className="block text-xs font-medium text-white/40 mb-1 ml-1 group-focus-within:text-blue-400 transition-colors">
                                Name
                            </label>
                            <input
                                type="text"
                                name="user_name"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all hover:bg-white/10"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="group">
                            <label className="block text-xs font-medium text-white/40 mb-1 ml-1 group-focus-within:text-blue-400 transition-colors">
                                Email
                            </label>
                            <input
                                type="email"
                                name="user_email"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all hover:bg-white/10"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="group">
                            <label className="block text-xs font-medium text-white/40 mb-1 ml-1 group-focus-within:text-blue-400 transition-colors">
                                Message
                            </label>
                            <textarea
                                name="message"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 h-32 text-white placeholder-white/20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all hover:bg-white/10"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        {status === 'error' && (
                            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
                                <AlertCircle size={16} />
                                <span>{errorMessage}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="mt-2 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'loading' ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    Send Message
                                    <Send className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ContactApp;

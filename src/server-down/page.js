
export default function ServerDownPage() {



return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-red-600">Please wait because I don't have money to pay for hosting</h1>
        <p className="text-lg text-gray-700 mt-4">Please wait for 50 seconds</p>
        <div className="tenor-gif-embed" data-postid="14219280639661570709" data-share-method="host" data-aspect-ratio="1" data-width="100%">
        <a href="https://tenor.com/view/cheeky-dudu-picking-nose-funny-dudu-loving-it-funny-gif-14219280639661570709">Cheeky Dudu Picking Nose Sticker</a> from <a href="https://tenor.com/search/cheeky+dudu-stickers">Cheeky Dudu Stickers</a>
        </div> 
        <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
        
    <button 
        onClick={() => window.location.reload()} 
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
        🔄 Retry
    </button>
    </div>
);


}

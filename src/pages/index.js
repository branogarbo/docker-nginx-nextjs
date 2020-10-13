import Link from 'next/link'

export default function Home() {
	let demos = ['list','timer','mapbox','googlemaps','api','database'];
	let listItems = demos.map(demo =>
		<Link href={`/demos/${demo}`}>
			<a><li>{demo} demo</li></a>
		</Link>
	);
	
	return (
		<div className="container">
			<h1>Home</h1>
			<ol>{listItems}</ol>
		</div>
	);
}
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  if (req.method === "GET") {
    setTimeout(()=> res.json({message:'go to sleep fool'}), 1000);
  }
}
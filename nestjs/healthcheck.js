(async () => {
  const response = await fetch('http://localhost:3000/healthcheck');
  process.exit(+!response.ok);
})();

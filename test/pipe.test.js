import Pipe from '@/pipe';

test('bla', async () => {
  const res = await Pipe
    .seq(() => 'hallo4')
    .par(() => 'hallo')
    .exec();
  console.log(res);
});

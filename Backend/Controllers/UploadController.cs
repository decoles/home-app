using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;

using Backend.Utilities;
using Backend.Models;
using Backend.Services;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UploadController : ControllerBase
{
    private readonly TransactionsService _transactions;

    public UploadController(TransactionsService transactions)
    {
        _transactions = transactions;
    }

    [HttpPost("json")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadJson(IFormFile file)
    {
        if (file == null || file.Length == 0 || !file.FileName.EndsWith(".json", StringComparison.OrdinalIgnoreCase))
            return BadRequest("Invalid file. Only .json files are allowed.");
        
        var results = await _transactions.HandleJson(file);

    return Ok($"Uploaded {results.Count} transaction records.");
    }
}

using Microsoft.AspNetCore.Mvc;
using Backend.Utilities;
using Backend.Models;
using Backend.Services;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

/// <summary>
/// Controller for handling file uploads and category management.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class UploadController : ControllerBase
{
    /// <summary>
    /// Service for handling transactions.
    /// </summary>
    private readonly TransactionsService _transactions;

    /// <summary>
    /// Database context for accessing the database.
    /// </summary>
    private readonly AppDbContext _db;

    /// <summary>
    /// Constructor for UploadController.
    /// </summary>
    /// 
    public UploadController(TransactionsService transactions, AppDbContext db)
    {
        _transactions = transactions;
        _db = db;
    }

    /// <summary>
    /// Uploads a JSON file containing transaction records.
    /// </summary>
    /// <param name="file"></param>
    /// <returns></returns>
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

